import { useMemo } from 'react';
import cn from 'classnames';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Status as StatusType } from '../types';
import { getStatusClasses, getStatusIcon } from '../utils';

type Props = {
  mode: StatusType;
  secondsRemaining?: number;
};

const Status = ({ mode, secondsRemaining = 0 }: Props) => {
  const triggered = useMemo(() => [StatusType.Triggered, StatusType.Pending].includes(mode), [mode]);

  const { Icon, colorClasses } = useMemo(
    () => ({
      Icon: getStatusIcon(mode),
      colorClasses: getStatusClasses(mode),
    }),
    [mode]
  );

  return (
    <div className="text-center w-100 overflow-hidden mb-2">
      {secondsRemaining > 0 ? (
        <div className={cn('d-flex w-100 justify-content-center', { trigger: triggered })}>
          <CountdownCircleTimer size={200} isPlaying duration={secondsRemaining} colors="#000">
            {({ remainingTime }) => (
              <div className='d-block'>
                <p className='fs-1 mb-0'>{remainingTime}</p>
                <p className='fs-5'>Seconds</p>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
      ) : (
        <div
          className={cn(
            'status-border border border-3 rounded-circle mx-auto',
            colorClasses
          )}
        >
          <Icon size="6em" />
        </div>
      )}
      <p className={cn('pt-3 text-capitalize fs-1 fw-bold', colorClasses)}>
        {mode}
      </p>
    </div>
  );
};

export default Status;
