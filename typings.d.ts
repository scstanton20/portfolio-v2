export interface Project {
    _id: string,
    dateCompleted: string,
    description: string,
    place: string,
    projectLink: string,
    image: {
        asset: {
            url: string;
        };
    };
    title: string;
};

export interface Certification {
    _id: string,
    image: {
        asset: {
            url: string;
        };
    };
    issuer: string,
    receivedDate: string,
    title: string;
};

export interface Experience {
    _id: string
    image: {
        asset: {
            url: string;
        };
    };
    companyLocation: string,
    companyName: string,
    jobType: string,
    startDate: string,
    endDate: string,
    responsibilities: string,
    role: string,
}