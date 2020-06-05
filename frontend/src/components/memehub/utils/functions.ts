export const toGrade = (percent: number): string => {
    switch (true) {
        case percent >=97:
            return "A+";
        case percent >=93:
            return "A";
        case percent >=90:
            return "A-";
        case percent >=87:
            return "B+";
        case percent >=83:
            return "B";
        case percent >=80:
            return "B-";
        case percent >=77:
            return "C+";
        case percent >=73:
            return "C";
        case percent >=70:
            return "C-";
        case percent >=67:
            return "D+";
        case percent >=63:
            return "D";
        case percent >=60:
            return "D-";
        default:
            return "F";
    }
};

export interface timeToDays {
    Daily: number;
    Weekly: number;
    Monthly: number;
    Ever: number;
}

export const timeToDays = {
    Daily: 1,
    Weekly: 7,
    Monthly: 30,
    Ever: 365
};

export const EvenIdx = (_: any, idx: number): boolean => {return idx % 2 === 0};
export const OddIdx = (_: any, idx: number): boolean => {return idx % 2 === 1};