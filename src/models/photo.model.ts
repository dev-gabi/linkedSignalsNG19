import { Album } from "./album.model";

export interface Photo extends Album
{
url:string;
thumbnailUrl:string;
albumId:number;
}