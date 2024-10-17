import { IsInt, MaxLength, ValidateIf } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AboutProductData } from '../../about-product-data/entities/about-product-data.entity';
import { Images } from '../../../modules/images/entities/images.entity';

@Entity('about_product_top_bar_image', { schema: 'hulahop_dev' })
export class AboutProductTopBarImage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.about_product_data_id !== null)
  @IsInt()
  @Column('int', { name: 'about_product_data_id' })
  about_product_data_id: number;

  @MaxLength(36)
  @Column('varchar', { name: 'top_bar_images_id', nullable: true, length: 36 })
  top_bar_images_id: string | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @ManyToOne(
    () => AboutProductData,
    (about_product_data) => about_product_data.about_product_top_bar_image,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn([{ name: 'about_product_data_id', referencedColumnName: 'id' }])
  about_product_data: AboutProductData;

  @ManyToOne(() => Images, (images) => images.shop_sliders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'top_bar_images_id', referencedColumnName: 'id' }])
  image: Images;
}
