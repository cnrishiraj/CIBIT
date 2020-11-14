import React from 'react';
import alanBtn from  '@alan-ai/alan-sdk-web';

// const alanKey='b1460b1760481aff85ece0b9df063d582e956eca572e1d8b807a3e2338fdd0dc/stage';
// const App1=()=>{
//     useEffect(()=>{
//         alanBtn({
//             key:alanKey,
            // onCommand:(command)=>{
            //     if(command==='test command')
            //     alert('this was executed')
            // }
//         });

//     },[])
//     return(
//         <div>
//         <h1>ddd</h1>
//         </div>
//     );
// }

class App1 extends React.Component{
    constructor(props){
    super(props);
        this.setState={
            authentication:true
        }

    }
    componentDidMount() {
        this.alanBtnInstance = alanBtn({ 
          key: 'b1460b1760481aff85ece0b9df063d582e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand:(command)=>{
            if(command==='test command')
            alert('this was executed')
        },
        });
      }

render(){
    return(
        <h1>
        dddd
        </h1>
    )
}
}


export default App1;
