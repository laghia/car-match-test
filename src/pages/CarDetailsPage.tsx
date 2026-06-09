import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarDetails } from '../data/content';
import { CarDetailsGallery } from '../components/car-details/CarDetailsGallery';
import { CarDetailsSidePanel } from '../components/car-details/CarDetailsSidePanel';
import { CarDetailsSubNav } from '../components/car-details/CarDetailsSubNav';
import { CarDetailsTitle } from '../components/car-details/CarDetailsTitle';
import { CarDetailsExpertReview } from '../components/car-details/CarDetailsExpertReview';
import { CarDetailsRunningCosts } from '../components/car-details/CarDetailsRunningCosts';
import { CarDetailsSectionTabs } from '../components/car-details/CarDetailsSectionTabs';
import { CarDetailsVariantPanel } from '../components/car-details/CarDetailsVariantPanel';
import { CarDetailsRelatedCars } from '../components/car-details/CarDetailsRelatedCars';
import { CarDetailsVehicleSpecs } from '../components/car-details/CarDetailsVehicleSpecs';
import './CarDetailsPage.css';

export function CarDetailsPage() {
  const { make, model, variantSlug } = useParams<{
    make: string;
    model: string;
    variantSlug: string;
  }>();

  const car = useMemo(
    () => getCarDetails(make ?? 'chery', model ?? 'tiggo-4', variantSlug ?? 'ultimate'),
    [make, model, variantSlug],
  );

  const [selectedVariantId, setSelectedVariantId] = useState(car.selectedVariantId);

  useEffect(() => {
    setSelectedVariantId(car.selectedVariantId);
  }, [car.selectedVariantId, make, model, variantSlug]);

  const selectedVariant =
    car.variants.find((variant) => variant.id === selectedVariantId) ?? car.variants[0];

  const displayTitle = `${car.year} ${car.make} ${car.model} ${selectedVariant?.trim ?? ''}`.trim();
  const displayVariant = selectedVariant?.engine ?? car.variant;
  const displayPrice = selectedVariant?.price ?? car.price;

  return (
    <div className="car-details-page">
      <CarDetailsSubNav make={car.make} model={car.model} />

      <div className="car-details-page__content">
        <div className="car-details-page__overview">
          <CarDetailsTitle title={displayTitle} variant={displayVariant} />

          <div className="car-details-page__hero-row">
            <CarDetailsGallery
              images={car.images}
              moreImagesCount={car.moreImagesCount}
              alt={displayTitle}
            />
            <CarDetailsSidePanel
              price={displayPrice}
              monthlyRepayment={car.monthlyRepayment}
              specs={car.specs}
              ancapYear={car.ancapYear}
              ancapStars={car.ancapStars}
            />
          </div>
        </div>

        <CarDetailsVariantPanel
          variantCount={car.variantCount}
          year={car.year}
          yearOptions={car.yearOptions}
          fuelFilters={car.fuelFilters}
          variants={car.variants}
          selectedVariantId={selectedVariantId}
          onSelectVariant={setSelectedVariantId}
        />
      </div>

      <CarDetailsSectionTabs />

      <CarDetailsRunningCosts data={car.runningCosts} />
      <CarDetailsExpertReview />
      <CarDetailsVehicleSpecs data={car.vehicleSpecs} />

      <CarDetailsRelatedCars cars={car.relatedCars} />
    </div>
  );
}
