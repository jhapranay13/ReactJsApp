let userInfos = [{
    userName: 'admin',
    password: 'admin',
    roles:'admin'
}, {
    userName: 'sam',
    password: 'Password$1',
    roles:'normal'
}, {
    userName: 'chris',
    password: 'Password$1',
    roles:'premium'
}, {
    userName: 'mark',
    password: 'Password$1',
    roles:'normal'
}, {
    userName: 'ram',
    password: 'Password$1',
    roles:'premium'
}, {
    userName: 'senju',
    password: 'Password$1',
    roles:'normal'
}, {
    userName: 'maddy',
    password: 'Password$1',
    roles:'premium'
}, {
    userName: 'raghu',
    password: 'Password$1',
    roles:'normal'
}, {
    userName: 'danny',
    password: 'Password$1',
    roles:'normal'
}, {
    userName: 'nancy',
    password: 'Password$1',
    roles:'premium'
}, {
    userName: 'kiara',
    password: 'Password$1',
    roles:'premium'
}, {
    userName: 'amy',
    password: 'Password$1',
    roles:'premium'
}, {
    userName: 'ganesh',
    password: 'Password$1',
    roles:'normal'
}, {
    userName: 'baha',
    password: 'Password$1',
    roles:'premium'
}];

let videoCardData = [{
    videoName: "MathProblem1",
    videoTitle: "The Simplest Math Problem No One Can Solve - Collatz Conjecture",
    videoSubs: "3.4M",
    videoAge: "6 Months",
    videoAuthor: "Macdonal",
    thumbnailPath: "math-problem.webp",
    profilepicPath: "profile1.jpeg",
    videoduration: "11:00"
}, {    
    videoName: "kadaneAlgo",
    videoTitle: "Kadane Algo explained in short",
    videoSubs: "1.4M",
    videoAge: "2 Years",
    videoAuthor: "Samuel",
    thumbnailPath: "kadane-algo.webp",
    profilepicPath: "profile2.jpeg",
    videoduration: "21:32" 
}, {
    videoName: "PowerOfNow",
    videoTitle: "The Power of now was never explained in such detail",
    videoSubs: "37.4M",
    videoAge: "6 Months",
    videoAuthor: "JK",
    thumbnailPath: "goole-tech-talk.webp",
    profilepicPath: "profile3.jpeg" ,
    videoduration: "7:45"
}, {
    videoName: "dubaiTrain",
    videoTitle: "OMG - Underwater dubai train. What you should know",
    videoSubs: "11.2M",
    videoAge: "1 Year",
    videoAuthor: "Explorer",
    thumbnailPath: "thumbnail11.webp",
    profilepicPath: "profile4.jpeg" ,
    videoduration: "1:20:44"
}, {
    videoName: "WaterDrinking",
    videoTitle: "What will happen if you drink so much water",
    videoSubs: "11.4K",
    videoAge: "9 Months",
    videoAuthor: "Newb",
    thumbnailPath: "thumbnail12.webp",
    profilepicPath: "profile5.jpeg",
    videoduration: "10:00" 
}, {
    videoName: "FoodVlogger",
    videoTitle: "Amazing food prepared the right way!!",
    videoSubs: "121.4K",
    videoAge: "2 years",
    videoAuthor: "Explorer",
    thumbnailPath: "thumbnail10.webp",
    profilepicPath: "profile4.jpeg",
    videoduration: "1:10:33" 
}];

const roleMenuMap = new Map();
roleMenuMap.set('admin', ['person-admin', 'video-library', 'profile-app', 'quiz-app']);
roleMenuMap.set('premium', ['video-library', 'profile-app', 'quiz-app']);
roleMenuMap.set('normal', ['profile-app', 'quiz-app']);

const menuTextMap = new Map();
menuTextMap.set('person-admin', 'Administration');
menuTextMap.set('video-library', 'Video Library');
menuTextMap.set('profile-app', 'Profile App');
menuTextMap.set('quiz-app', 'Quiz');

const menuComponentMap = new Map();
menuComponentMap.set('person-admin', 'Adminstration');
menuComponentMap.set('video-library', 'VideoLibrary');
menuComponentMap.set('profile-app', 'CounterApp');
menuComponentMap.set('quiz-app', 'QuizApp');

export const quizData = [{
    ques: "Demo Question 1 So some random text just like that?",
    ans: [
        "Answer 1.",
        "Answer 2 so making something else.",
        "Answer 3 so making something else making it a bit longer.",
        "4th time."
    ]
}, {
    ques: "Demo Question 2 So some random text just like that. So lets see the timer run?",
    ans: [
        "Answer 1.",
        "Answer 2 so making something else.",
        "Answer 3 so making something else making it a bit longer.",
        "4th time."
    ]
}, {
    ques: "Demo Question 3 So lets see the timer run?",
    ans: [
        "Answer 1.",
        "Answer 2 so making something else.",
        "Answer 3 so making something else making it a bit longer.",
        "4th time."
    ]
}];


export const checkForUserNameAndSave = (userState) => {
    let isValid = true;

    for (const userInfo of userInfos) {
        const [userName, password, roles] = Object.keys(userInfo);

        if (userState.userName.trim().toLowerCase() === userInfo[userName]) {
            isValid = false;
            break;
        }       
    }

    if (isValid) {
        userInfos.push({
            userName: userState.userName,
            password: userState.password,
            roles: userState.role
        });
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(isValid);
        }, 
        3000
        );
    }, (reject) => {
        throw new Error("Something went wrong");
    });
};

export const tryLogin = (usrName, passwrd) => {
    let role = '';

    for (const userInfo of userInfos) {
        const [userName, password, roles] = Object.keys(userInfo);

        if (usrName.trim().toLowerCase() === userInfo[userName] && passwrd === userInfo[password]) {
            role = userInfo[roles];
            break;
        }       
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(role);
        }, 
        3000
        );
    }, (reject) => {
        throw new Error("Username or password does not exist!!");
    });
};

export const fetchMenuItems = (role) => {

    const menuOnRole = roleMenuMap.get(role);
    const menuList = [];

    if (menuOnRole) {
    
        for (const menuText of menuOnRole) {
            const text = menuTextMap.get(menuText);
            const componentPath = menuComponentMap.get(menuText);
            menuList.push({text, componentPath});
        }
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(menuList);
        }, 
        3000
        );
    }, (reject) => {
        throw new Error("Username or password does not exist!!");
    });
};

export const fetchUserData = (usrName) => {
    const userDataList = [];

    for (const userInfo of userInfos) {
        const [userName] = Object.keys(userInfo);

        if (usrName.trim().toLowerCase() === userInfo[userName]) {
            continue;
        }    
        userDataList.unshift(userInfo);   
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userDataList);
        }, 
        3000
        );
    }, (reject) => {
        throw new Error("Username or password does not exist!!");
    });
};

export const saveData = (data) => {
    let index = 0;

    for (const userInfo of userInfos) {
        if (data.has(userInfo.userName)) {
            userInfos[index] = {
                ...userInfo,
                ...data.get(userInfo.userName)
            };
        }    
        index++;
    }
};

export const deleteData = (data) => {
    let index = 0;

    for (const userInfo of userInfos) {
        if (data.has(userInfo.userName)) {
            userInfos.splice(index, 1);
        }    
        index++;
    }
};

const videoSelectionData = new Map();

export const fetchVideoData = (userName) => {
    const selectedVideo = videoSelectionData.get(userName);
    const videoSelected = [];
    const videoAvailable = [];

    for (const videoData of videoCardData) {

        if (selectedVideo && selectedVideo.has(videoData)) {
            videoSelected.push(videoData);
        } else {
            videoAvailable.push(videoData);
        }
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({videoSelected, videoAvailable});
        }, 
        500
        );
    }, (reject) => {
        throw new Error("Username or password does not exist!!");
    });
};