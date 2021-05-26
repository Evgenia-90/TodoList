import { action } from '@storybook/addon-actions';
import { EditableSpan } from "./EditableSpan";


export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const changeCallback = action("Title changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan value={"Start title"} onChange={changeCallback}/>
}