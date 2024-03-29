import { Accordion, ActionIcon, Box, Card, Collapse, Group, Paper, ScrollArea, Text, Tooltip, Transition } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals';
import { IconChevronDown, IconChevronUp, IconX } from '@tabler/icons';
import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { VideoContext } from '../../contexts/VideoContext';
import useFadingState from '../../hooks/useFadingState';
import useIsMobile from '../../hooks/useIsMobile';
import useLongPress from '../../hooks/useLongPress';
import { createQuery, getQuery } from '../../lib/utils';
import CommentsList from '../comments/CommentsList';
import PlaylistList from '../playlists/PlaylistList';
import Settings from '../menus/Settings';
import ChaptersList from '../videos/ChaptersList';
import RecommendedList from '../videos/RecommendedList';
import { TabsContext } from '../../contexts/TabsContext';
import TabRenderers from './TabRenderers';

const MultiTabs = () => {
    let navigate = useNavigate();
    let [tabs, { remove, reorder, close, open }] = useContext(TabsContext);
    let { playlist } = useContext(VideoContext);
    let [plBtnHvr, { start: plBtnOnClick }] = useFadingState(3000);
    let isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) {
            open("recommended");
            open("comments");
            if (playlist) open("playlist");
        };
    }, [isMobile]);

    let plCloseHandlers = useLongPress(() => {
        close("playlist");
        navigate({ search: createQuery({ v: getQuery("v") }) });
    }, () => plBtnOnClick());

    let plButton = (tab) => <Tooltip label="Hold to close playlist" opened={isMobile ? plBtnHvr : undefined}>
        <ActionIcon
            sx={(theme) => ({ color: theme.fn.dimmed() })}
            {...plCloseHandlers}>
            <IconX />
        </ActionIcon>
    </Tooltip>

    let renderCloseBtn = (tab, i) => {
        if (tab == "playlist") return plButton(tab)
        if (isMobile ? (!([
            "comments",
            "recommended",
        ].includes(tab))) : true) return (
            <Tooltip label="Close">
                <ActionIcon
                    sx={(theme) => ({ color: theme.fn.dimmed() })}
                    onClick={() => remove(i)}>
                    <IconX />
                </ActionIcon>
            </Tooltip>
        );

        if(tabs.length > 2) return <ActionIcon />;
        return <></>;
    };

    let allTabs = ["playlist", "comments", "chapters", "recommended", "settings"];

    return (
        <>
            <Accordion variant='separated' chevronPosition="left" multiple={!isMobile} defaultValue={!isMobile && allTabs} mb={tabs.length && "md"}>
                {tabs.map((tab, i) => <Transition mounted transition="scale-y" key={tab}>
                    {(styles) => <Accordion.Item value={tab} style={styles}>
                        <Box px="sm" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Accordion.Control py="sm">
                                {tab[0].toUpperCase() + tab.slice(1)}
                            </Accordion.Control>
                            <Tooltip.Group>
                                {i > 0 && <Tooltip label="Move up">
                                    <ActionIcon
                                        sx={(theme) => ({ color: theme.fn.dimmed() })}
                                        onClick={() => reorder({ from: i, to: i - 1 })}>
                                        <IconChevronUp />
                                    </ActionIcon>
                                </Tooltip>}
                                {(i >= (tabs.length - 1)) && i > 0 && <ActionIcon />}
                                {(i < (tabs.length - 1)) && <Tooltip label="Move down">
                                    <ActionIcon
                                        sx={(theme) => ({ color: theme.fn.dimmed() })}
                                        onClick={() => reorder({ from: i, to: i + 1 })}>
                                        <IconChevronDown />
                                    </ActionIcon>
                                </Tooltip>}
                                {renderCloseBtn(tab, i)}
                            </Tooltip.Group>
                        </Box>
                        <Accordion.Panel>
                            <Wrapper renderer={TabRenderers[tab]} />
                        </Accordion.Panel>
                    </Accordion.Item>}
                </Transition>)}
            </Accordion>
        </>
    );
};

let Wrapper = ({ renderer }) => {
    let ref = useRef();

    return (
        <ScrollArea h="65vh" ref={ref}>
            {renderer({ scrollRef: ref })}
        </ScrollArea>
    );
}

export default MultiTabs
