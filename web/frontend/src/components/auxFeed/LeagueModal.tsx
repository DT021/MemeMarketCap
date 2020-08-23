import React from 'react';
import styled from 'styled-components';
import { CloseModal } from '../utils/CloseModal';

export const LeagueModal = () => {
    return (
        <div className="modal fade" id="leagueModal" tabIndex={-1} role="dialog"
            aria-labelledby="leagueModalLabel" aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content modal-body">
                    <div className="container-fluid">
                        <CloseModal />
                        <LeagueModalContent>
                            <img src="https://media.sproutsocial.com/uploads/meme-example.jpg" width="100%" alt="" />
                        </LeagueModalContent>
                        <LeagueModalVotes>
                            <i className="fas fa-arrow-down fa-lg"></i>
                            <i className='fal fa-swords fa-lg' data-toggle="tooltip" data-placement="top" title="Season 1 Round 1" />
                            <i className="fas fa-arrow-up fa-lg"></i>
                        </LeagueModalVotes>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LeagueModalContent = styled.div`
    margin-top: 2.5rem;
`;

const LeagueModalVotes = styled.div`
    display: flex; justify-content: space-evenly; align-items: center; margin-top: 1rem;
`;