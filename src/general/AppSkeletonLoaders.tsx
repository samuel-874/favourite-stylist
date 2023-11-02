import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

export const OrderSkeleton = () =>{
    return (
      <div >
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <Skeleton  height={20} width={100} />
        <Skeleton  height={20} width={100} />
        </div>
        <div style={{display:"flex",margin:"10px 0"}}>
  
        <Skeleton circle height={40} width={40} />
          <div style={{marginLeft:"10px"}}>
          <Skeleton count={3} height={20} width={100} />
          </div>
        </div>
        <hr />
        <div style={{display:"flex"}}>
          <Skeleton count={3} width={30} height={10} />
          <div style={{marginLeft:"10px"}} >
          <Skeleton  width={80} height={10} />
          <Skeleton  width={50} height={10} />
          <Skeleton  width={30} height={10} />
          </div>
        </div>
        <Skeleton height={35} />
        <div style={{display:"flex",alignItems:"center",margin:"10px 0"}}>
          <Skeleton height={20} width={50} />
          <div style={{marginLeft:"10px",display:"flex",justifyContent:"space-around",alignItems:"center",flex:"1"}}>
            <Skeleton  height={30} width={30} />
            <Skeleton  height={30} width={30} />
            <Skeleton  height={30} width={30} />
          </div>
        </div>
  
        <Skeleton height={140} />
        <div style={{display:"flex",justifyContent:"space-between",margin:"10px 0"}}>
          <Skeleton height={40} width={100} />
          <Skeleton height={40} width={100} />
        </div>
      </div>
    )
  }

export const ServiceSkeleton = () => {
    const myArr = [0,1];
    
    return (
        <div>
            {myArr.map( arr =>
            <div key={arr}>
                 <div style={{padding:"0 10px"}}>
               <div style={{display:"inline-block",verticalAlign:"top"}}><Skeleton borderRadius={16} height={60} width={40} /></div> 
                <div style={{margin:"0 6px",display:"inline-block",width:"70%"}}>
                    <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                        <Skeleton height={25} width={200} /> <Skeleton height={25} width={30} />
                    </div>
                    <Skeleton height={16} width={70} />
                    <div style={{margin:"3px 0"}}>
                    <Skeleton count={2} height={16}  />
                    </div>
                </div>
            </div>
            <hr />
            </div>
                
                )}
                <div style={{padding:"0 10px",width:"65%"}}>
                    <Skeleton height={14} />
                </div>
       
            {myArr.map( arr =>
            <div key={arr}>
                 <div style={{padding:"0 10px"}}>
               <div style={{display:"inline-block",verticalAlign:"top"}}><Skeleton borderRadius={16} height={60} width={40} /></div> 
                <div style={{margin:"0 6px",display:"inline-block",width:"70%"}}>
                    <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                        <Skeleton height={25} width={200} /> <Skeleton height={25} width={30} />
                    </div>
                    <Skeleton height={16} width={70} />
                    <div style={{margin:"3px 0"}}>
                    <Skeleton count={2} height={16}  />
                    </div>
                </div>
            </div>
            <hr />
            </div>
                
                )}
       
            
        </div>
    )
}