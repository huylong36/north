import { LayoutHome } from '../layout/home';
export const AppNavigation = () => {
    const renderHome = () => {
        return (
            <LayoutHome />
        )
    }
    // const renderHomeAdmin = () => {
    //     return (
    //     )
    // }
    return <>
        {renderHome()}
    </>
}