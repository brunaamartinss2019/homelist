import Jumbotron from "../../ui/jumbotron/jumbotron";

function PageLayout({ children, jumbotron }) {
    return (
        <>
            {jumbotron && (<Jumbotron {...jumbotron} />)}
            <div className="container py-4">
                {children}
            </div>
        </>
    );
}
export default PageLayout;