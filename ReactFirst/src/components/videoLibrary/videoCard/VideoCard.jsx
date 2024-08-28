import classes from './VideoCard.module.css';

const getImagePaths = (imgName) => {
    return (new URL(`../../../assets/${imgName}`, import.meta.url)).href;
};

export const VideoCard = ({videoData, onVideoCardClickHandler}) => {
    const vidName = videoData.videoName;
    const vidThumbNailPath = videoData.thumbnailPath;
    const profilePicPath = videoData.profilepicPath;
    const videoTitle = videoData.videoTitle;
    const profileName = videoData.videoAuthor;
    const subsStats = videoData.videoSubs;
    const vidAge = videoData.videoAge;
    const  duration = videoData.videoduration;

    return(
        <div className={classes["video-card"]} data-video-name={vidName}>
            <div className={classes["video-cover"]} data-video-name={vidName} onClick={onVideoCardClickHandler}>
            </div>
            
            <div className={classes["video-thumbnail-container"]}>
                <img className={classes["video-thumbnail"]} src={getImagePaths(vidThumbNailPath)}/>
                <div className={classes["video-duration"]}>
                    {duration}
                </div>
            </div>
            <div className={classes["video-description"]}>
                <div className={classes["uploader-pic-container"]}>
                    <img className={classes["uploader-pic"]} src={getImagePaths(profilePicPath)}/>
                </div>
                <div className={classes["descritopn-stats-container"]}>
                    <div className={classes["title-container"]}>
                        {videoTitle}
                    </div>
                    <div className={classes["profile-name-container"]}>
                        {profileName} &#x2713
                    </div>
                    <div className={classes["subscription-total-container"]}>
                        {subsStats} subscriptions  {"\&#183"} {vidAge}
                    </div>
                </div>    
            </div>
        </div>
    );
};