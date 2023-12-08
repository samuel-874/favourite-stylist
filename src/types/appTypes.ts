
export type MenuList = {
    label:string,
    link:string,
    key:number
}

export  type StylistCredentials = {
    id?:number,
    firstname?:string,
    lastname?:string,
    profilePic:string,
    mobile:string,
    averageRatings:number,
    location:string,
    distance?:number,
    isCertified?:boolean,
    isLiked?:boolean
    specialties?:string[]
}



export type FormDataType = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
}

export type Stylist = {id:number,full_name:string,profile:string}

export type Article = {
    content:string
    id:number
    likes:number
    stylists?:Stylist
    thumbnail?:string
    title:string
    views:number
}

/*     "data": {
        "profilePic": null,
        "firstname": "Florida",
        "lastname": "Oyedayo",
        "bio": "Florida is a Profesional stylist. She schooled in Oritakoko nursery and primary school and is specialized in curly hair",
        "certificateType": "National Hair Authorities",
        "specialties": [
            "NATURAL_HAIR",
            "CURLY_HAIR",
            "CHILDREN",
            "ADULTS"
        ],
        "location": "kogo 2, ushafa road ,bwari Abuja, Nigeria",
        "certificate": "1696416018514fonts.pdf",
        "facebook": "https://facebook.com/florida",
        "instagram": "https://instagram.com/florida",
        "email": "florida@gmail.com",
        "mobile": "2349033026709",
        "galleryImages": [],
        "reviews": [],
        "igfollowers": 300000
    } */

export type StylistDetails = {
    profilePic:string;
    firstname:string;
    lastname:string;
    email:string;
    mobile:string;
    bio:string;
    isLiked:boolean;
    averageRating:number;
    certificateType:string;
    specialties:String[];
    location:string;
    certificate:string;
    facebook:string;
    instagram:string;
    galleryImages:string[];
    reviews:ReviewType[];
    igfollowers:number;
}

export type Comments = {
        id?: number,
        user: {
            id?: number,
            full_name: string
        },
        message:string

}

export type ReviewType = {
    id?: number,
    user: {
        id?: number,
        full_name: string
    },
    message:string
    count:number;
}

export type Video = {
    id:number
    title:string
    url:string
    thumbnail:string
    views:number
    likes:number
    isLiked:boolean
    stylists?:Stylist
    comments?:Comments[]
}

export type IndexType= {
    index:number,
    setIndex: Function
}

export type FilterType =  {
    itemsFilter:{
         display: string;
        filter: {
            certification: string;
            worksWithKids: boolean;
            hairType:string;
            curlySistersStylist: boolean;
            colorHairStylist: boolean;
            seeAll: boolean;
        };
    },
    updateItemsFilter:Function
       
    
}

export type CardProps = {
    layout?:string
}

export type Staged = {
    stagedStylist:{show:boolean,id:number}
    setStagedStylist:Function
}

export type OrderDetail = {
    id:string
    service:string
    stylist:string
    stylistPic:string
    mobile:string
    location:string
    date:number
    orderDate:number
    status:string
    price:number
    meetingLink:string
    isPaid:boolean
}

export type PaymentOrderDetail = {
    id:string
    stylist:string
    service:string
    duration:string
    price:number
    summary:number
    stylistPic:string
    status:string
    isPaid:boolean
    clientsName:string
    clientsEmail:string
    clientsMobile:string
}

export type OrderContextType = {
    stagedOrder:{orderId:number,show:boolean}
    setStagedOrder:Function
}

export type Service = {
        id: number,
        name:string,
        price: number,
        description:string,
        duration: string,
        image: string
}

export enum OrderRole  {
    CUSTOMER="CUSTOMER",INTERMEDIARY="INTERMEDIARY"
}

export type ClientFormData = {
    country:string
    state:string
    zipCode:string
    appointmentAim:string
    currentHairRoutine:string
    productsInUse:string
    howYouSleep:string
    problemWithHair:string
    whatHelpNeeded:string
    note:string
    canRecordVideo:"yes"|"no"|"",
    canUseVideoSnippets:"yes"|"no"|""
}
