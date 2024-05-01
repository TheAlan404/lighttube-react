import { Button, Loader, ScrollArea, Stack, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { VideoPlayerContext } from "../../../api/context/VideoPlayerContext";
import { HorizontalVideoCard } from "../../cards/VideoCard";
import { APIContext } from "../../../api/context/APIController";
import { Comment } from "../../../api/types/comment";
import { CommentCard } from "../../cards/CommentCard";
import { ErrorMessage } from "../../ui/ErrorMessage";

export const CommentsTab = () => {
    const { api, currentInstance } = useContext(APIContext);
    const { videoID } = useContext(VideoPlayerContext);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState<Comment[]>([]);
    const [continuationKey, setContinuationKey] = useState(null);

    const fetchComments = async (more?: boolean) => {
        setLoading(true);
        try {
            let { key, results } = await api.getComments(videoID, more ? continuationKey : null);
            setComments((c) => more ? [...c, ...results] : results);
            setContinuationKey(key);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchComments(false);
    }, [videoID, currentInstance]);

    return (
        <ScrollArea w="100%" maw="100%" h="100%" type="scroll" scrollbars="y">
            <Stack w="100%" p="xs">
                {comments.map((comment, i) => (
                    <CommentCard
                        key={i}
                        comment={comment}
                    />
                ))}
                <ErrorMessage
                    error={error}
                    retry={() => fetchComments(!!comments.length)}
                />
                {!isLoading && (
                    <Button
                        variant="light"
                        color="violet"
                        onClick={() => fetchComments(true)}
                    >
                        moar comments pwease uwu
                    </Button>
                )}
                {isLoading && (
                    <Stack w="100%" align="center">
                        <Loader />
                        <Text>
                            Loading...
                        </Text>
                    </Stack>
                )}
            </Stack>
        </ScrollArea>
    );
};