class Timer{


    constructor(task,tick,timeout){
        // let timeouter = null;

        // let p = setInterval(task,tick);
      
        // timeouter = setTimeout(()=>{
        //     clearInterval(p);
        //     clearTimeout(timeouter);
        // },timeout);

        new Promise((resolve)=>{
            resolve(setInterval(task,tick))
        }).then(t=>{
            setTimeout(()=>{
                clearInterval(t)
                Promise.resolve()
            },timeout);
        });
    }

}

export default Timer