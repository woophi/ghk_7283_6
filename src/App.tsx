import { BottomSheet } from '@alfalab/core-components/bottom-sheet/cssm';
import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { StatusBadge } from '@alfalab/core-components/status-badge';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { ChevronRightShiftRightMIcon } from '@alfalab/icons-glyph/ChevronRightShiftRightMIcon';
import { useEffect, useState } from 'react';
import hbImg from './assets/hb.png';
import { LS, LSKeys } from './ls';
import { productsData } from './productsData';
import { appSt } from './style.css';

export const App = () => {
  const [screen, setScreen] = useState<'init' | 'select'>('init');
  const targetProduct = productsData.find(product => product.children)!;

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const handleProductClick = (link: string, title: string, toScreenSelect?: boolean) => {
    window.gtag('event', '7283_click_product', { var: 'var5', product: title });
    if (toScreenSelect) {
      setScreen('select');
    } else {
      window.location.replace(link);
    }
  };

  if (screen === 'select') {
    return (
      <>
        <div className={appSt.container}>
          <div className={appSt.box}>
            <img src={hbImg} alt="HB" width="100%" height={180} style={{ objectFit: 'contain' }} />

            <Typography.TitleResponsive tag="h2" view="medium" font="system" weight="medium" color="primary">
              Новые сбережения
            </Typography.TitleResponsive>

            <Typography.Text view="primary-medium" color="primary" style={{ maxWidth: '288px' }}>
              Обычный счёт в различных валютах с возможностью выпустить карту. Открытие бесплатно
            </Typography.Text>
          </div>

          {targetProduct.children?.map(product => (
            <PureCell
              onClick={() => {
                handleProductClick(product.link, product.title);
              }}
              key={product.title}
            >
              <PureCell.Content>
                <PureCell.Main>
                  <Typography.Text view="primary-medium" color="primary">
                    {product.title}
                  </Typography.Text>
                  <Typography.Text view="primary-small" color="secondary">
                    {product.subtitle}
                  </Typography.Text>
                </PureCell.Main>
              </PureCell.Content>
              <PureCell.Graphics verticalAlign="center">
                <ChevronRightShiftRightMIcon color="#B8B9C0" />
              </PureCell.Graphics>
            </PureCell>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <BottomSheet
        open={true}
        onClose={() => {
          window.gtag('event', '7283_exit_click', { var: 'var5' });
          window.location.replace('alfabank://open_new_product');
        }}
        contentClassName={appSt.btmContent}
        title="Накопления"
        hasCloser
        stickyHeader
        initialHeight="full"
      >
        <div className={appSt.container}>
          {productsData.map(product => (
            <PureCell
              onClick={() => {
                handleProductClick(product.link, product.title, !!product.children);
              }}
              key={product.title}
            >
              <PureCell.Content>
                <PureCell.Main>
                  <div className={appSt.row}>
                    <Typography.Text view="primary-medium" color="primary">
                      {targetProduct.title}
                    </Typography.Text>
                    {product.children && (
                      <StatusBadge
                        view="negative-block"
                        size={24}
                        customIcons={{
                          'negative-block': {
                            '24': () => <>3</>,
                          },
                        }}
                      />
                    )}
                  </div>
                  <Typography.Text view="primary-small" color="secondary">
                    {product.subtitle}
                  </Typography.Text>
                </PureCell.Main>
              </PureCell.Content>
              <PureCell.Graphics verticalAlign="center">
                <ChevronRightShiftRightMIcon color="#B8B9C0" />
              </PureCell.Graphics>
            </PureCell>
          ))}
        </div>
      </BottomSheet>
    </>
  );
};
