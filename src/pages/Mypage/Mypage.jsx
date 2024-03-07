/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react";
import WideButton from "../../components/WideButton/WideButton";
import { useInput, useInputuserImg } from "../../hooks/useInput";
import * as S from "./style";
import { useLoadUser } from "../../hooks/loadList"


/**
 * 
 * 1. 이미지 클릭시 이미지 변경가능해야함.
 * 2. 수정하기 버튼 클릭시 localStorage에 key: user value: JSON데이터
 *  {
 *      nickname: "테스트계정",
 *      namd: "김준일",
 *      birthday: "1994-09-07",
 *      imgUrl: ""
 *  }
 *  저장되어야하고 페이지 로드시 불러와야함.
 * 3. RootHeader의 프로필 이미지도 변경되어야함.
 */

function Mypage(props) {
    const [ nicknameValue, handleNicknameOnChange, setnicknameValue ] = useInput();
    const [ nameValue, handleNameOnChange, setnameValue ] = useInput();
    const [ birthdayValue, handleBirthdayOnChange, setbirthdayValue ] = useInput();

    // const [ profileUrl, setProfileUrl ] = useState(defaultProfile);
    const [ imgValue, handleOnChange, setFiles ] = useInputuserImg();


    const { userList } = useLoadUser();
    
    const imgdata = useRef();


    
    
    
    useEffect (() => {
        if(userList.length !== 0) {
            setnicknameValue(userList[0].nickname)
            setnameValue(userList[0].name)
            setbirthdayValue(userList[0].birthday)
            setFiles(userList[0].imgUrl)
            return
        }
        
    }, [])
    
    const handelClick = () => {
        
        

        let userIfon = [];

        
        if(userList.length === 0) {
            if(nicknameValue === "") {
                alert("닉네임을 입력하세요")
                return
            } else if(nameValue === "") {
                alert("이름을 입력하세요")
                return
            } else if(birthdayValue === "") {
                alert("생일을 입력하세요")
                return
            }
        } 
            
       
        const board = {
            nickname: nicknameValue,
            name: nameValue,
            birthday: birthdayValue,
            imgUrl: imgValue
        }
        userIfon = [board];
        localStorage.setItem("user", JSON.stringify(userIfon));
        window.location.reload()
        alert("회원정보가 수정되었습니다.");
    }



    return (
        <div css={S.layout}>
            <div css={S.imageBox}>
                <input type="file" style={{display: "none"}} multiple={true} ref={imgdata} onChange={handleOnChange}/>
                <img src={imgValue}  onClick={() => imgdata.current.click()}/> 
            </div>
            
            <input css={S.inputBox} type="text" placeholder="닉네임" Value={nicknameValue} onChange={handleNicknameOnChange} />
            <input css={S.inputBox} type="text" placeholder="이름" Value={nameValue} onChange={handleNameOnChange}/>
            <input css={S.inputBox} type="text" placeholder="생년월일" Value={birthdayValue} onChange={handleBirthdayOnChange}/>
            <WideButton text={"수정하기"} onClick={handelClick}/>
        </div>
    );
}

export default Mypage;