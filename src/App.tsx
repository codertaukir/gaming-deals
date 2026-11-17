import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'motion/react';
import { MainLayout, PageLoader } from '@/components/layout';
import { AboutPage } from '@/pages/AboutPage';
import { AffiliateDisclosurePage } from '@/pages/AffiliateDisclosurePage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ComparePage } from '@/pages/ComparePage';
import { ContactPage } from '@/pages/ContactPage';
import { DealsPage } from '@/pages/DealsPage';
import { EditorialIndexPage } from '@/pages/EditorialIndexPage';
import { GameDetailsPage } from '@/pages/GameDetailsPage';
import { GamesCataloguePage } from '@/pages/GamesCataloguePage';
import { GtaHubPage } from '@/pages/GtaHubPage';
import { HardwareCataloguePage } from '@/pages/HardwareCataloguePage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';
import { SearchPage } from '@/pages/SearchPage';
import { TermsPage } from '@/pages/TermsPage';
import { ROUTES } from '@/router/routes';

export default function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path={ROUTES.home} element={<HomePage />} />
                <Route path={ROUTES.pcGames} element={<GamesCataloguePage variant="pc" />} />
                <Route
                  path={ROUTES.playstation}
                  element={<GamesCataloguePage variant="playstation" />}
                />
                <Route path={ROUTES.xbox} element={<GamesCataloguePage variant="xbox" />} />
                <Route
                  path={ROUTES.mobileGames}
                  element={<GamesCataloguePage variant="mobile" />}
                />
                <Route path={ROUTES.gameDetails} element={<GameDetailsPage />} />
                <Route
                  path={ROUTES.accessories}
                  element={<HardwareCataloguePage variant="accessories" />}
                />
                <Route
                  path={ROUTES.hardware}
                  element={<HardwareCataloguePage variant="hardware" />}
                />
                <Route path={ROUTES.productDetails} element={<ProductDetailsPage />} />
                <Route path={ROUTES.compare} element={<ComparePage />} />
                <Route path={ROUTES.deals} element={<DealsPage />} />
                <Route path="/coupons" element={<DealsPage defaultTab="coupons" />} />
                <Route path={ROUTES.gtaHub} element={<GtaHubPage />} />
                <Route path={ROUTES.search} element={<SearchPage />} />
                <Route path={ROUTES.reviews} element={<EditorialIndexPage variant="reviews" />} />
                <Route
                  path={ROUTES.reviewDetails}
                  element={<ArticleDetailsPage expectedType="review" />}
                />
                <Route path={ROUTES.guides} element={<EditorialIndexPage variant="guides" />} />
                <Route
                  path={ROUTES.guideDetails}
                  element={<ArticleDetailsPage expectedType="guide" />}
                />
                <Route path={ROUTES.about} element={<AboutPage />} />
                <Route path={ROUTES.contact} element={<ContactPage />} />
                <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicyPage />} />
                <Route path={ROUTES.terms} element={<TermsPage />} />
                <Route path={ROUTES.affiliateDisclosure} element={<AffiliateDisclosurePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  );
}
