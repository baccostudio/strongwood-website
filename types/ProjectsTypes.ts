import { ImgDataInterface } from ".";

export interface ProjectsDataContextInterface {
    handleProjectDataChange?: Function;
    projectData?: ProjectInterface;
}

export interface ProjectDataInterface {
    [id: string]: ProjectInterface;
}

export interface ProjectInterface {
    projectSlug: string;
    title: string;
    subtitle: string;
    image: ImgDataInterface;
    year: string,
    location: string,
    details: {
        portraitImg?: ImgDataInterface;
        rectangleImg?: ImgDataInterface;
        secondRectangleImg?: ImgDataInterface;
        thirdRectangleImg?: ImgDataInterface;
        twoSmallImg?: ImgDataInterface[];
        secondTwoSmallImg?: ImgDataInterface[];
        thirdTwoSmallImg?: ImgDataInterface[];
        technicalInfo?: TechnicalInfoInterface;
        secondTechnicalInfo?: TechnicalInfoInterface;
    };
    categories: SelectedFilterInterface[];
    urlSlug: SelectedFilterInterface
}

export type SelectedFilterInterface =
    "all"
    | "kitchen"
    | "closet"
    | "bathroom"
    | "desk"
    | "warehouse"
    | "office-and-industry"
    | "rack"
    | "bedroom"
    | "others"
    | "products";

export type ImgPlacheholderInterface = "portrait" | "rectangle" | "twoSmall"

export interface ProjectSelectorInterface {
    selectorTitle: string;
    selectorFilter: string;
};

export interface TechnicalInfoInterface {
    image: ImgDataInterface,
    title: string,
    description: string[],
    price_ars?: string,
    price_card?: string,
    footer?: {
        materials: string[],
        propousal: string[],
        year: string[],
        location?: string[]
    },
    homeFooterData?: {
        proyects?: { title: string, url: string },
        contact?: { title: string, url: string }
    }
};