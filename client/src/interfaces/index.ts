export interface userProp {
    _id: string,
    username: string,
    email: string
}

export interface postProp {
    _id: string,
    url: string,
    title: string,
    description: string,
    type: string,
    thumbnail: string,
    htmlContent: string,
    tags: string[],
    user: {
        _id: string,
        username: string,
    }
}