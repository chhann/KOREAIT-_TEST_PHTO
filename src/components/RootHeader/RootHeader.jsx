/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as S from "./style";
import defaultImg from "../../assets/images/profile/default.jpeg"

import { useLoadUser } from "../../hooks/loadList"
import { useInputuserImg } from "../../hooks/useInput";
import { useEffect } from "react";

function RootHeader() {

    const [ imgValue, handleOnChange, setFiles ] = useInputuserImg();
    const { userList } = useLoadUser();

    

    useEffect(() => {
        if(userList.length !== 0){
            setFiles(userList[0].imgUrl)
        }
    },[userList])

    return (
        <div css={S.layout}>
            <Link css={S.titleLink} to={"/"}>
                <h1>사진첩 어플</h1>
            </Link>
            <Link css={S.mypageLink} to={"/mypage"}>
                <img src={imgValue} alt="" />
            </Link>
        </div>
    );
}

export default RootHeader;