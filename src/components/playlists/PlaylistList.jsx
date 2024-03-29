import React, { useContext } from 'react'
import { VideoContext } from '../../contexts/VideoContext'
import ListRenderer from '../ListRenderer'

const PlaylistList = () => {
    let { playlist } = useContext(VideoContext);

    return (
        <>
            <ListRenderer list={playlist?.videos || []} />
        </>
    )
}

export default PlaylistList
