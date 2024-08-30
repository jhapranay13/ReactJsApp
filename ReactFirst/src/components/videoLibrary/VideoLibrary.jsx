import { useReducer, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { fetchVideoData } from "../../data/Data";
import { Accordian } from "../accordian/Accordian";
import { AccordianCounter } from "../accordianWithCount/AccordianCounter";
import { ConfirmBox } from "../confirmBox/ConfirmBox";
import { VideoCard } from "./videoCard/VideoCard";

const videoStateReducer = (state, action) => {
    
    if (action.action === "ADD_SELECTED") {
        const videoName = action.videoName;
        const selectedVid = state.available.filter((obj, i, arr) => {

            if (obj.videoName === videoName) {
                return true;
            }
            return false;
        });
        const available = state.available.filter((obj, i, arr) => {
            if (obj.videoName === videoName) {
                return false;
            }
            return true;
        });

        return {
            selected: [...state.selected, ...selectedVid],
            available,
        };
    }

    if (action.action === "ADD_AVAILABLE") {
        const videoName = action.videoName;
        const selectedVid = state.selected.filter((obj, i, arr) => {

            if (obj.videoName === videoName) {
                return true;
            }
            return false;
        });
        const selected = state.selected.filter((obj, i, arr) => {
            if (obj.videoName === videoName) {
                return false;
            }
            return true;
        });

        return {
            selected,
            available:[...state.available, ...selectedVid],
        };
    }
}

export const VideoLibrary = () => {
    const {videoSelected, videoAvailable} = useLoaderData();
    const [videoState, dispatchVideoStateAction] = useReducer(videoStateReducer, {selected:[...videoSelected], available:[...videoAvailable]});
    const selectVideo = [];
    const availVideo = [];
    const[video, SetVideo] = useState('');
    const ref = useRef();

    const onVideoCardClickHandler = (event) => {
        const videoName = event.target.dataset.videoName;
        dispatchVideoStateAction({
            action: "ADD_SELECTED",
            videoName: videoName,
        });
    };

    const fnToExecuteOnOk = () => {
        dispatchVideoStateAction({
            action: "ADD_AVAILABLE",
            videoName: video,
        });
        ref.current.close();
    };

    const fnToExecuteOnCancel = () => {
        ref.current.close();

    };
    const message = "Saving is tTODO but this is working and that was the intention"

    const onVideoCardClickRemoveHandler = (event) => {
        const videoName = event.target.dataset.videoName;
        ref.current.open();
        SetVideo(videoName);
    };
    for(const obj of videoState.selected) {
        selectVideo.push(<VideoCard videoData={obj} onVideoCardClickHandler={onVideoCardClickRemoveHandler}></VideoCard>)
    }

    for(const obj of videoState.available) {
        availVideo.push(<VideoCard videoData={obj} onVideoCardClickHandler={onVideoCardClickHandler}></VideoCard>)
    }
    return (
       <>
            <ConfirmBox ref={ref} message={message} fnToExecuteOnOk={fnToExecuteOnOk} fnToExecuteOnCancel={fnToExecuteOnCancel}></ConfirmBox>
            <AccordianCounter key ={Math.random()} header={"Video Added"} counter={selectVideo.length }>
                {selectVideo.length > 0 ? selectVideo : <p>No Video Selected</p>}
            </AccordianCounter>
            <Accordian header={"Available Video"} key ={Math.random()}>
                {availVideo.length > 0 ? availVideo : <p>No Video Available for selection</p>}
            </Accordian>
       </>
    );
};

export const videoLoader = async ({request, params}) => {
    const queryParams = new URL(request.url).searchParams.get('role');
    const menuLists = await fetchVideoData(queryParams);
    return menuLists;
};