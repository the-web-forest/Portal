import { Tooltip, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import IPlantDetailResponse from '../../../infra/dtos/Plant/IPlantDetail.dto';
import ToastCaller from '../../../infra/toast/ToastCaller';
import GetPlantDetailUseCase from '../../../infra/useCases/getPlantDetail.usecase';
import Header from '../../../sections/header';
import styles from './styles.module.scss';
import { addHours, format, parseISO } from 'date-fns';
import Image from 'next/image';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import CustomizePlantUseCase from '../../../infra/useCases/customizePlant.usecase';
import pagePaths from '../../../infra/core/pagePaths';

const getPlantDetailUseCase = new GetPlantDetailUseCase();
const customizePlantUseCase = new CustomizePlantUseCase();

const PlantDetails = () => {
  const router = useRouter();
  const toast = useToast();
  const [plant, setPlant] = useState<IPlantDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatDate = (date: string) => {
    try {
      const newDate = addHours(parseISO(date), 3);
      const fDate = format(newDate, 'dd/MM/yy');
      const fTime = format(newDate, 'HH:mm:ss');
      return `${fDate} às ${fTime}`;
    } catch (error) {
      return '';
    }
  };

  const parseHastags = (hastags: string) => {
    const MAX_HASTAGS = 5;

    if (!plant) {
      return;
    }

    let hastagsCollection = hastags.split(' ').map(item => {
      return item.trim().slice(0, 50);
    });

    if (!hastagsCollection) {
      hastagsCollection = [];
    }

    if (hastagsCollection.length >= MAX_HASTAGS + 1) {
      return;
    }

    if (hastagsCollection.length == 1 && hastagsCollection[0] == '') {
      hastagsCollection = [];
    }

    setPlant({ ...plant, hastags: hastagsCollection });
  };

  const printHastags = (hastagString: string[]) => {
    if (!plant) {
      return '';
    }

    if (!plant.canEdit && hastagString.length > 0) {
      return `#${hastagString.join(' #').toString()}`;
    }

    return hastagString.toString().split(',').join(' ');
  };

  const customizePlant = () => {
    if (!plant) {
      return;
    }

    const isEmpty = !plant.name && !plant.message && plant.hastags.length <= 0;

    if (isEmpty) {
      ToastCaller.Warning(
        toast,
        'Atenção!',
        'Você deve customizar ao menos um atributo da sua árvore',
      );
      return;
    }

    customizePlantUseCase
      .run({
        plantId: plant.plantId,
        treeName: plant.name || '',
        treeHastags: plant.hastags,
        treeMessage: plant.message || '',
      })
      .then(() => {
        router.reload();
      })
      .catch(() => {
        ToastCaller.Error(toast, 'Erro', 'Erro ao personalizar a árvore');
      });
  };

  useEffect(() => {
    const plantId = router.query.id as string;
    setIsLoading(false);

    if (!plantId) {
      return;
    }

    getPlantDetailUseCase
      .run(plantId)
      .then(data => {
        setPlant(data);
      })
      .catch(() => {
        ToastCaller.Error(toast, 'Erro', 'Erro ao carregar sua árvore');
        setTimeout(() => {
          router.back();
        }, 1000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router, router.query.id, toast]);

  return (
    <>
      <Header title="Meu Plantio" />
      <div className={styles.container}>
        <div className={styles.title}>Personalize sua árvore</div>
        <div className={styles.message}>
          Lembre-se: você poderá personalizar sua árvore apenas uma vez.
        </div>
        {plant && (
          <div className={styles.box}>
            <div className={styles.header}>
              <div className={styles.order}>Pedido {plant.orderId}</div>
              <div className={styles.date}>
                <div className={styles.icon}>
                  <Image src={'/icons/calendar.svg'} width={20} height={20} />
                </div>
                Plantio: {formatDate(plant.createdAt)}
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.input}>
                  <span className={styles.label}>
                    Nome da árvore ({plant.species})
                  </span>
                  <Input
                    skin={'light'}
                    name={'name'}
                    placeholder={plant.species}
                    maxLength={50}
                    value={plant.name || ''}
                    type={'text'}
                    onChangeFunction={e =>
                      setPlant({ ...plant, name: e.target.value })
                    }
                    disabled={!plant.canEdit}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.labelWithTooltip}>
                    Inserir tags (
                    {plant.hastags.filter(item => item != '').length})
                    <Tooltip
                      color="white"
                      label="Separe suas tags com espaços. Exemplo: amerelo filhos natureza"
                    >
                      <div className={styles.tooltip}>i</div>
                    </Tooltip>
                  </div>

                  <Input
                    skin={'light'}
                    name={'hastags'}
                    placeholder={'Exemplo: amarelo filhos natureza'}
                    value={printHastags(plant.hastags)}
                    type={'text'}
                    onChangeFunction={e => parseHastags(e.target.value)}
                    disabled={!plant.canEdit}
                  />
                </div>
              </div>
              <div className={styles.line}>
                <div className={styles.input} style={{ width: '100%' }}>
                  <span className={styles.label}>
                    Mensagem ({plant.message?.length || 0})
                  </span>
                  <TextArea
                    skin={'light'}
                    name={'name'}
                    placeholder={
                      'O comentário fica disponível em sua floresta individual e em nossa floresta coletiva.'
                    }
                    cols={10}
                    rows={3}
                    maxLength={280}
                    value={plant.message || ''}
                    onChangeFunction={e => setPlant({ ...plant, message: e })}
                    disabled={!plant.canEdit}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.customizeNow}>
        <div className={styles.button}>
          <FilledButton
            color={FilledColor.white}
            onClick={() => router.push(pagePaths.forest.index)}
            type="submit"
            width="100%"
            disabled={isLoading}
          >
            Voltar
          </FilledButton>
        </div>
        {plant && plant.canEdit && (
          <div className={styles.button} style={{ marginLeft: '30px' }}>
            <FilledButton
              color={FilledColor.budGreen}
              onClick={() => customizePlant()}
              type="submit"
              width="100%"
              disabled={isLoading}
            >
              {isLoading ? 'Carregando' : 'Salvar Alterações'}
            </FilledButton>
          </div>
        )}
      </div>
    </>
  );
};

export default PlantDetails;
