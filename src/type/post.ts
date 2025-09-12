//ui 코드가 없으면 ts 파일로 만들면 된다.
//export interface PostDto로 해도 된다.

export type PostDto = {
    id: number; 
    title: string;
    content : string;
    createDate : string;
    modifyDate : string;
}

