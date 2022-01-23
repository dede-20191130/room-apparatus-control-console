import { mediaQueries, mediaQueriesForSimpleString } from 'components/design/media-query-setting'
import { pseudoTableMixin } from 'components/ui/table/themed-table'
import styled from 'styled-components'
import emptyRoom from './empty-room-with-windows.jpg'
import { BASE_LENGTH } from './room-image-param'

interface IImageContainerDivArgs {
    readonly baseLength: number;
    readonly emptyRoom: string;
}

const ImageContainerDiv = styled.div<IImageContainerDivArgs>`
display:table;
width:100%;
${pseudoTableMixin}
& > a{
    display:none;
}

${mediaQueries("sm")`
display:block;
position:relative;
z-index:1;
background-position:center;
background-size:contain;
& > a{
    display:inline-block;
    position:absolute;
    bottom:10px;
    right:10px;
    color:grey;
    font-size:10px;
    &:link{
        color:grey;
    }
}

`}
${props => mediaQueriesForSimpleString("sm")(`
width: ${props.baseLength * (3 / 4)}px;
height: ${props.baseLength * (3 / (4 * 2.22))}px;
background-image:url(${props.emptyRoom});
`)}
${props => mediaQueriesForSimpleString("md")(`
width: ${props.baseLength}px;
height: ${props.baseLength / 2.22}px;
`)}
`

const TblColDetailDiv = styled.div`
display:table-column-group;
> span{
    display: table-column;
    width: 50%;
}
${mediaQueries("sm")`
display:none;
`}
`

export const RoomImageArea = ({ children }: { children: React.ReactNode }) => {
    return (
        <ImageContainerDiv baseLength={BASE_LENGTH} emptyRoom={emptyRoom}>
            <TblColDetailDiv>
                <span></span>
                <span></span>
            </TblColDetailDiv>
            {children}
            <a href='https://jp.freepik.com/photos/background' target="_blank" rel="noreferrer noopener">
                Kjpargeter - jp.freepik.com によって作成された background 写真
            </a>
        </ImageContainerDiv>
    )
}