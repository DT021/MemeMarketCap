import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { usePostMemeMutation } from '../../../../generated/graphql';
import { CloseModal } from '../../../utils/CloseModal';
import { intoModal } from '../../../utils/intoModal';
import SHA256 from "crypto-js/sha256";
import { useStoreState, useStoreActions } from '../../../../store/store';

const hashBlob = async (blob: Blob) => SHA256(await new Response(blob).text()).toString();

const Content = () => {
    const { localFile }  = useStoreState(state => state.localUpload);
    const { setLocalFile } = useStoreActions(actions => actions.localUpload);
    const onDrop = useCallback(
        (acceptedFiles: File[]) => acceptedFiles.map(
            (file: File) => setLocalFile(window.URL.createObjectURL(file))
        ), [setLocalFile]
    )
    const {
        getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({ onDrop, accept: 'image/*' });
    const style = useMemo(() => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}) 
        }),
        [isDragActive, isDragReject, isDragAccept]
    );
    return localFile
        ? <LocalImg src={localFile} alt=""/>
        :(
            <DragNDrop>
                // @ts-ignore
                <div {...getRootProps({style})}>
                    <input {...getInputProps()} /><p>Drag n Drop</p><p>-or-</p><p>Click</p>
                </div>
            </DragNDrop>
        );
}

const Uploadbar = () => {
    const { localFile } = useStoreState(state => state.localUpload)
    const { setLocalFile } = useStoreActions(actions => actions.localUpload);
    const [postMeme] = usePostMemeMutation();
    const uploadNpostMeme = async () => {
        if(localFile){
            const imgBlob = await fetch(localFile).then(r => r.blob());
            const { data } = await postMeme({ variables: {
                file: new File(
                    [imgBlob],
                    `${await hashBlob(imgBlob)}.png`,
                    { type: "image/png" }
                )
            }});
            if(data) {
                console.log(data);
            }
            setLocalFile('');
        }
    };
    const fileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setLocalFile(window.URL.createObjectURL((e.target as HTMLInputElement).files![0]));
    };
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <UploadBtn onClick={_ => uploadNpostMeme()}>Upload</UploadBtn>
            </div>
            <div className="custom-file">
                <FileInput onChange={fileSelected} />
                <FileInputLabel>Choose file</FileInputLabel>
            </div>
            <ClearBtn onClick={_ => setLocalFile('')} >
                <i className="fal fa-backspace"/>
            </ClearBtn>
        </div>
    )
};

export const UploadModal = () => {
    
    return intoModal(<><CloseModal /><Content /><Uploadbar /></>, "uploadModal");
};

const LocalImg = styled.img`
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 1rem;
`;

const ClearBtn = styled.button.attrs(props => ({
    className: "btn btn-secondary input-group-append"
}))``;

const UploadBtn = styled.span.attrs(props => ({
    className: "input-group-text",
    id: "UploadBtnPrepend"
}))``;

const FileInput = styled.input.attrs(props => ({
    className: "custom-file-input",
    id: "fileinput",
    type: "file",
    "aria-describedby": "UploadBtnPrepend",
}))``;

const FileInputLabel = styled.label.attrs(props => ({
    className: "custom-file-label",
    htmlFor: "fileinput"
}))``;

const DragNDrop = styled.div`
    display: flex;
    position: relative;
    height: 300px;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    margin-bottom: 1rem;
    &:hover{cursor: pointer;}
`;

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#111',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};
const activeStyle = { borderColor: '#2196f3' };
const acceptStyle = { borderColor: '#00e676' };
const rejectStyle = { borderColor: '#ff1744' };