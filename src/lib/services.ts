import servicesData from '../data/services.json';

export type Service = {
    id: string;
    image: string;
    price: string;
    index: boolean;
    description: string;
};

export const getServices = (): Service[] => {
    return servicesData as Service[];
};

export const getIndexServices = (): Service[] => {
    return getServices().filter((service) => service.index === true);
};

