import { Routes,Route } from "react-router-dom"
import { SignUp } from "./components/form/signup/Signup";
import { Signin } from "./components/form/signin/Signin";
import { Forms } from "./components/form/Forms";
import { ForgottenPassword } from "./components/form/forgotten password/ForgottenPassword";
import { ResetPassword } from "./components/form/forgotten password/ResetPassword";
import { ActivateAccount, Helper, NotFound } from "./general/GeneralComponents";
import { AppTemplate } from "./components/app template/AppTemplate";
import { Home } from "./components/home/Home";
import { ArticleDetails } from "./components/details/article/ArticleDetails";
import { VideoDetails } from "./components/details/video/VideoDetails";
import { RecommendedArticles } from "./components/recomendations/RecommendedArticles";
import { RecommendedVideos } from "./components/recomendations/RecommendedVideos";
import { RecentlyViewedArticles } from "./components/recomendations/RecentlyViewedArticles";
import { StylistDetailsPage } from "./components/details/stylist/StylistDetailsPage";
import { Bookings } from "./components/bookings/Bookings";
import { OrderStylists } from "./components/other booking pages/stylist to order/OrderStylists";
import { ClientDetails } from "./components/other booking pages/ClientDetails.tsx/ClientDetails";
import { CheckOut } from "./components/other booking pages/check out/CheckOut";
import { ClientForm } from "./components/other booking pages/client preparation form/ClientForm";
import { Authenticator } from "./components/form/signin/Authenticator";

function App() {

  return (
    <div>
        <Routes>
          <Route path="/" element={<AppTemplate />} >
              <Route path="" element={<Home />} />
              <Route path="/recently-viewed" element={<RecentlyViewedArticles />} />
              <Route path="/article-list" element={<RecommendedArticles />} />
              <Route path="/video-list" element={<RecommendedVideos />} />
              <Route path="/consultation" element={<h1>Consultation Page</h1>} />
              <Route path="/articles/:id" element={<ArticleDetails />} />
              <Route path="bookings" >
                <Route path="" element={<Bookings />} />
                <Route path="select-stylist" element={<OrderStylists />} />
                <Route path="client-details" element={<ClientDetails />} />
                <Route path="checkout/:id" element={<CheckOut />} />
                <Route path="preparation-form/:id" element={<ClientForm />} />
              </Route>
              <Route path="/stylists/:id" element={<StylistDetailsPage />} />
              <Route path="/videos/:id" element={<VideoDetails />} />
          </Route>
          <Route path="" element={<Forms />} >
            <Route path="signup" element={<SignUp />}  />
            <Route path="signin" element={<Signin />} />
            <Route path="callback" element={<Authenticator />} />
            <Route path="forgotten-password" element={<ForgottenPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>
          <Route path="/activate/:token" element={<ActivateAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
