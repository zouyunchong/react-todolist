import React,{useState,useEffect} from 'react'
const useLocalStorage=(storageKey, fallbackState) => {
        const [value, setValue] = useState(
          JSON.parse(localStorage.getItem(storageKey)) || fallbackState
        );
      
        useEffect(() => {
          localStorage.setItem(storageKey, JSON.stringify(value));
        }, [value, storageKey]);
      
        return [value, setValue];
      };
      
export default function Footer(props) {
    const [isOpen, setOpen] = useLocalStorage('is-open', false);

    const showChecked = () => {
        setOpen(!isOpen);
    };
    let { list,selectLength } = props;
    
    
    return (
                <div className='showBox'>
                    <button  onClick={showChecked} className="showbtn">{isOpen &&  selectLength !== 0 ? '隐藏已完成': '显示已完成'}</button>
                    {isOpen && <ul className='showUl'>
                            {
                                list.map((obj)=>{
                                    return (
                                        obj.checked && <li key={obj.id}>{obj.content}</li>
                                        
                                    )
                                })
                            }  
                        </ul>}
                </div>
            );
}
