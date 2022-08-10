namespace ToastCaller {
  export function Error(
    toast: Function,
    title: string,
    description: string,
    duration: number = 2000,
  ) {
    toast({
      title,
      description,
      duration,
      status: 'error',
      isClosable: true,
      position: 'top-right',
    });
  }
  export function Success(
    toast: Function,
    title: string,
    description: string,
    duration: number = 2000,
  ) {
    toast({
      title,
      description,
      duration,
      status: 'success',
      isClosable: true,
      position: 'top-right',
    });
  }
  export function Warning(
    toast: Function,
    title: string,
    description: string,
    duration: number = 2000,
  ) {
    toast({
      title,
      description,
      duration,
      status: 'warning',
      isClosable: true,
      position: 'top-right',
    });
  }
  export function Info(
    toast: Function,
    title: string,
    description: string,
    duration: number = 2000,
  ) {
    toast({
      title,
      description,
      duration,
      status: 'info',
      isClosable: true,
      position: 'top-right',
    });
  }
}

export default ToastCaller;
