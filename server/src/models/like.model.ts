export interface likeModel {
    like_id?: number,
    user_id: number,
    post_id: number
}

export interface likedIDsQueryResult {
    liked_ids: number[]
}