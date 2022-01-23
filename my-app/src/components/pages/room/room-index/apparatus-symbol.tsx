import { fadeInKeyframes } from "components/design/animation-conf";
import { mediaQueries, mediaQueriesForSimpleString } from "components/design/media-query-setting";
import { doResetPseudoTableCellMixin, pseudoTableCellMixin, pseudoTableRowMixin } from "components/ui/table/themed-table";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tAppaCondsGrpObj } from "./room-cond-composer"
import { BASE_LENGTH } from './room-image-param'

const SVG_LENGTH = BASE_LENGTH / 12;

interface ISvgContainerDivArgs {
    readonly top: string;
    readonly left: string;
    readonly width: string;
}

const SvgContainerDiv = styled.div<ISvgContainerDivArgs>`
display:contents;
${mediaQueries("sm")`
display:flex;
position:absolute;
`}
${props => mediaQueriesForSimpleString("sm")(`
top:${props.top};
left:${props.left};
width:${props.width};
`)}
`

const RowDiv = styled.div`
display:table-row;
${pseudoTableRowMixin}
${mediaQueries("sm")`
display:contents;

`}
`
const NameBoxDiv = styled.div`
display:table-cell;
text-align:center;
vertical-align:middle;
${pseudoTableCellMixin}
${mediaQueries("sm")`
display:none;
`}
`

const SvgWrapper = styled.div`
display:table-cell;
text-align:center;
vertical-align:middle;
${pseudoTableCellMixin}
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
    ${fadeInKeyframes()}
}
${mediaQueries("sm")`
${doResetPseudoTableCellMixin}
display:inline-block;

`}
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
        <SvgContainerDiv
            top={`${appaCondEntry[1].yCood}%`}
            left={`calc(${appaCondEntry[1].xCood}% - ${appaCondEntry[1].appaData.length * (SVG_LENGTH / 2)}px)`}
            width={`${appaCondEntry[1].appaData.length * SVG_LENGTH}px`}
        >
            {appaCondEntry[1].appaData.map(appaDatum => {
                const SvgComp = appaCondEntry[1].SvgComp;
                return (
                    <RowDiv key={appaDatum.id}>
                        <NameBoxDiv>{appaDatum.name}</NameBoxDiv>
                        <SvgWrapper>
                            <SvgComp
                                className={appaDatum.isError ? "error" : ""}
                                onClick={(e: MouseEvent) => navigateLink(e, appaDatum.id)}
                                onKeyDown={(e: KeyboardEvent) => navigateLink(e, appaDatum.id)}
                                role="link"
                                tabIndex={0}
                            ></SvgComp>

                        </SvgWrapper>
                    </RowDiv>
                )
            })}
        </SvgContainerDiv >
    )
}