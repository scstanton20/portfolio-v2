export interface Project {
    _id: string,
    dateCompleted: string,
    description: any[],
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
}

export interface Experience {
    _id: string
    image: {
        asset: {
            url: string;
        };
    };
    companyLocation: string,
    companyName: string,
    positions: Position[],
    jobType: string,
    title: string,
    location: string | null,
    startDate: string,
    endDate: string | null,
    description: string | null,
}

export interface ConnectPhoto {
    _id: string,
    image: {
        asset: {
            url: string;
        };
    };
    alt: string;
}