import { expandedPostModel } from "./post.model"
import { userInfo } from "./user.model"

export interface AuthInterface { 
    auth: boolean | null
    setAuth: React.Dispatch<React.SetStateAction<boolean | null>> | null
    userInfo: userInfo | null
}

export interface FeedInterface {
    feedData: expandedPostModel[] | null
    setFeedData: React.Dispatch<React.SetStateAction<expandedPostModel[] | null>> | null
}

export const defaultAuthState: AuthInterface = {
    auth: null,
    setAuth: null,
    userInfo: null
}

export const defaultFeedState: FeedInterface = {
    feedData: null,
    setFeedData: null
}