import { AspectRatio, Avatar, Group, Image, Text, Tooltip } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import TextWithTooltip from "../util/TextWithTooltip";

export function Channel(props) {
    return (
        <Group align="center" spacing="xs">
            {props.channel?.avatar && <Avatar size="sm" radius="xl" src={props.channel?.avatar} imageProps={{ loading: "lazy" }} />}
            <Text>
                {props.channel?.title}
            </Text>
            {props.channel?.badges?.map((b, i) => <>
                {b.style == "BADGE_STYLE_TYPE_VERIFIED" && <Tooltip key={i} label={b.tooltip}>
                    <IconCheck size="1em" />
                </Tooltip>}
            </>)}
        </Group>
    );
}

export function MiniInfo(props) {
    if (!props.viewCount && !props.published && !props.dateText) return <></>;
    return (
        <TextWithTooltip inherit c="dimmed" fz="sm" lineClamp={props.size && 1}>
            {props.viewCount} - {props.published || props.dateText}
        </TextWithTooltip>
    );
}

export function Thumbnail(props) {
    return (
        // 16   x
        // -- = --
        // 9    4
        // 64 = 9x
        <AspectRatio ratio={16 / 9}
            w={props.w || (16 / 1.5) + "em"}
            h={props.h || (9 / 1.5) + "em"}>
            <Image src={(props.thumbnails && props.thumbnails[props.thumbnails.length - 1]?.url)
                || ("https://img.youtube.com/vi/" + props.id + "/hqdefault.jpg")} />
        </AspectRatio>
    );
}