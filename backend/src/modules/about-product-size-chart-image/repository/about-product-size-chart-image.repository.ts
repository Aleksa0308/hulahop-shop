import { dataSource } from '../../../core/data-source';
import { AboutProductSizeChartImage } from '../entities/about-product-size-chart-image.entity';

export const aboutProductDataSizeChartImageRepository =
  dataSource.getRepository(AboutProductSizeChartImage);
