/** @jsxImportSource @emotion/react */
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useInputImg } from "../../hooks/useInput";
import { useEffect, useMemo, useRef, useState } from "react";


/**
 *  1. 사진 불러오기 버튼을 클릭 후 5개 이상의 이미지를 불러올 수 있어야함.
 *  2. PromiseAll을 사용하여 이미지를 순서대로 불러와야함.
 *  3. 불러오기가 완료되면 "이미지를 저장하시겠습니까?" 라는 확인 취소 메세지 창이 떠야함.
 *  4. 확인 클릭시 localStorage에 key: photo, value: JSON 데이터
 *      [
 *          {
 *              id: 1,
 *              imageUrl: ""
 *          },
 *          {
 *              id: 2,
 *              imageUrl: ""
 *          }
 *      ]
 *      형식으로 저장되어야함.
 *  5. 취소시 저정되면 안됨.
 */

function PhotoRegister() {
    const [value, handleOnChange] = useInputImg();
    const [ok , setOk ] =useState("");


    const imgdata = useRef();
    const uploadFilesId = useRef(0);

    const boardList = useMemo(() => {
        const lsBoardList = localStorage.getItem("imgList");
        return !lsBoardList ? [] : JSON.parse(lsBoardList);
    }, [ok]);

    

    useEffect (() => {
        const fileArray = Array.from(value);
        
        if(fileArray.length === 0) {
            return;
        }

        let promises = [];

        promises = fileArray.map(file => new Promise(reslove => {
            const loadImage = {
                id: uploadFilesId.current += 1,
                imageURL: ""
            }

            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                reslove({
                    ...loadImage,
                    imageURL: e.target.result
                });           
            };
            fileReader.readAsDataURL(file);
        }))

        Promise.all(promises)
        .then(result => {
            let abc = []
            abc = [...boardList,...result]
            console.log(abc);
            if(!window.confirm("이미지를 저장하시겠습니까?")) {
                alert("취소되었습니다")
                return
            }
                localStorage.setItem("imgList", JSON.stringify(abc));
                alert("저장되었습니다")
                setOk("저장")
        });
    },[value])


    

    




    return (
        <div css={S.layout}>
            <h1 css={S.title}>사진 등록하기</h1>
            <input type="file" style={{display: "none"}} multiple={true} ref={imgdata} onChange={handleOnChange}/>
            <WideButton text={"사진 불러오기"} onClick={() => imgdata.current.click()}/>
        </div>
    );
}

export default PhotoRegister;