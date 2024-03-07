import { useMemo } from "react";

export function useLoadList() {

    const boardList = useMemo(() => {
        const lsBoardList = localStorage.getItem("imgList");
        return !lsBoardList ? [] : JSON.parse(lsBoardList);
    }, []);
    
    
    
    return { boardList } ;
}







export function useLoadUser() {

    const userList = useMemo(() => {
        const lsBoardList = localStorage.getItem("user");
        return !lsBoardList ? [] : JSON.parse(lsBoardList);
    }, []);
    
    
    
    return { userList } ;
}