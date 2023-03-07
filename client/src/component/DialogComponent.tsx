import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const DialogComponent = (props: {
    open?: boolean
    title?: string
    content?: JSX.Element
    size?: any
    className?: string
    style?: any
    handleClose?: any
    fullScreen?: boolean
    setIsFixedHeaderOverView?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const {
        open = true,
        title,
        content,
        handleClose,
        size,
        className,
        style,
        fullScreen,
        setIsFixedHeaderOverView
    } = props

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth={size || "sm"}
            fullWidth
            className={className}
            style={style}
            fullScreen={fullScreen}
            disableEnforceFocus={true}
            disableAutoFocus={true}
        >
            {
                title !== '' && (
                    <DialogTitle style={{ fontWeight: "bolder", marginBottom: '10px' }}>{title}</DialogTitle>
                )
            }
            <DialogContent
                onScroll={(event: React.UIEvent<HTMLDivElement>) => {
                    const scrollTop = event.currentTarget.scrollTop

                    if (setIsFixedHeaderOverView !== undefined) {
                        if (scrollTop > 140) {
                            setIsFixedHeaderOverView(true)
                        } else {
                            setIsFixedHeaderOverView(false)
                        }
                    }
                }}
            >
                {content}
            </DialogContent>
        </Dialog>
    )
}
