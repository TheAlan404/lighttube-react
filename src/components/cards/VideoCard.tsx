import { Grid, Paper, Stack, Text, Title } from "@mantine/core";
import { ThumbnailRender } from "./ThumbnailRender";
import { VideoInfo } from "../../api/types/video";
import { Link } from "react-router-dom";

export const HorizontalVideoCard = ({
    video,
}: {
    video: VideoInfo,
}) => {
    return (
        <Paper
            withBorder
            p="md"
            shadow="md"
            component={Link}
            to={`/watch?v=${video.id}`}
        >
            <Grid>
                <Grid.Col span="content">
                    <ThumbnailRender
                        thumbnails={video.thumbnails}
                        fallback={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    />
                </Grid.Col>
                <Grid.Col span="auto">
                    <Stack>
                        <Title order={3}>
                            {video.title}
                        </Title>
                        <Text>
                            {video.shortDescription}
                        </Text>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Paper>
    )
};