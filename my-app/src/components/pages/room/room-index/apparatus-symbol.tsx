import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tAppaCondsGrpObj } from "./room-cond-composer"
import { BASE_LENGTH } from './room-image-param'

const SVG_LENGTH = BASE_LENGTH / 12;

const SvgContainerDiv = styled.div`
    display:flex;
    position:absolute;
    & svg{
        z-index:2;
        width:${`${SVG_LENGTH}px`};
        height:${`${SVG_LENGTH}px`};
        fill:green;
        cursor:pointer;
        animation: fadeIn 1s ease-in-out infinite alternate;
        &.error{
            fill:red;
            animation-duration: 0.3s;
        }
        @keyframes fadeIn {
            0% {
                opacity:0;
            }
            100% {
                opacity:1;
            }
        }
    }
`

export const ApparatusSymbol = ({ appaCondEntry, roomId }: { appaCondEntry: [string, tAppaCondsGrpObj], roomId: string }) => {
    const navigate = useNavigate();
    function navigateLink(event: MouseEvent | KeyboardEvent, id: string) {
        if (
            event.type !== "click"
            && (event.type === "keydown" && (event as KeyboardEvent).code !== "Enter")
        ) return;
        navigate(`/${roomId}/${id}`);

    }

    return (
        <SvgContainerDiv key={appaCondEntry[0]}
            style={{
                width: `${appaCondEntry[1].appaData.length * SVG_LENGTH}%`,
                top: `${appaCondEntry[1].yCood}%`,
                left: `calc(${appaCondEntry[1].xCood}% - ${appaCondEntry[1].appaData.length * (SVG_LENGTH / 2)}px)`,
            }}>
            {appaCondEntry[1].appaData.map(appaDatum => {
                const SvgComp = appaCondEntry[1].SvgComp;
                return (
                    <SvgComp
                        key={appaDatum.id}
                        className={appaDatum.isError ? "error" : ""}
                        onClick={(e: MouseEvent) => navigateLink(e, appaDatum.id)}
                        onKeyDown={(e: KeyboardEvent) => navigateLink(e, appaDatum.id)}
                        role="link"
                        tabIndex={0}
                    ></SvgComp>
                )
            })}
        </SvgContainerDiv >
    )
}