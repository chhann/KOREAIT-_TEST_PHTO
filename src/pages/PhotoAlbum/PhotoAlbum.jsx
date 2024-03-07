
/**
 *  1. 사진 등록하기를 통해 등록된 이미지들을 각자 자유롭게 디자인하여 불러와야함.
 *  2. localStorage에 저장된 사진이 없으면 
 *      <h1>불러올 사진이 없습니다.<h1>
 *      문구가 중앙에 나오도록해야함.
 */

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";


const imglayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #dbdbdb;
    /* border-radius: 50%; */
    width: 100%;
    height: 300px;
    overflow: hidden;

    &> img {
        width: 100%;
    }
`


function PhotoAlbum() {

    const boardList = useMemo(() => {
        const lsBoardList = localStorage.getItem("imgList");
        return !lsBoardList ? [] : JSON.parse(lsBoardList);
    }, []);

    
    return (
        <div>   
            {   
                boardList.map((img, index) => 

                    <div key={index} css={imglayout}>
                        <img src={img.imageURL} alt="" />
                    </div>
                
                )
            }
        </div>
    );
}

export default PhotoAlbum;