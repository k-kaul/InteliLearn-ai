import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

export const UserAvatar = ({
    name,
    imageUrl
}: {
    name:string,
    imageUrl: string | undefined
}) => {
    const initials = name[0].toUpperCase() || "U";
    const displayName = name || "User";
    return (
        <Avatar className={"size-10"}>
            {imageUrl && <AvatarImage src={imageUrl} alt="image"/>}
            <AvatarFallback className={"font-bold"}>{initials}</AvatarFallback>
        </Avatar>
    )
}