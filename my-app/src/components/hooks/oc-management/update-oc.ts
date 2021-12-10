import { updateOCsContext } from "context/oc-context"
import { useContext, useEffect } from "react"
import { useLocation } from "react-router";

export function useUpdateOCWhenInitialied() {
    const updateOCs = useContext(updateOCsContext);
    // 運転状況を更新する
    //// トリガー：画面初期表示時
    useEffect(() => {
        if (updateOCs) updateOCs();
    }, [])
}

export function useUpdateOCWhenPathnameChanged() {
    const updateOCs = useContext(updateOCsContext);
    const location = useLocation();
    // 運転状況を更新する
    //// トリガー：URL変更時
    useEffect(() => {
        if (updateOCs) updateOCs();
    }, [location.pathname])
}