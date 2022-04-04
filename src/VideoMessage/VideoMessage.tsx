import React from 'react';

import './VideoMessage.css';

import { FaCloudDownloadAlt, FaExclamationTriangle } from 'react-icons/fa';

import classNames from 'classnames';
import ProgressCircle from '../Circle/Circle';

const VideoMessage: React.FC<IVideoMessageProps> = (props) => {
  var progressOptions = {
    strokeWidth: 2.3,
    color: '#efe',
    trailColor: '#aaa',
    trailWidth: 1,
    step: (state: IProgressOptions, circle: IProgressOptions) => {
      circle.circle.path.setAttribute('trail', state.state.color);
      circle.circle.path.setAttribute('trailwidth-width', state.state.width);

      var value = Math.round(circle.circle?.value() * 100);
      if (value === 0)
        circle.circle?.setText('');
      else
        circle.circle?.setText(value);
    }
  };

  const error = props.data?.status && props.data?.status.error === true;
  const downloaded = props.data?.status && props.data?.status.download;

  return (
    <div
      className={classNames('rce-mbox-video', {
        'padding-time': !props.data?.text,
      })}>
      <div
        className='rce-mbox-video--video'
        style={{...props.data?.width && props.data?.height && {
          width: props.data.width,
          height: props.data.height,
        }}}>

        {
          !downloaded &&
          <img
            src={props.data?.uri}
            alt={props.data?.alt}
            onClick={() => props.onOpen}
            onLoad={() => props.onLoad}
            onError={() => props.onPhotoError}/>
        }

        {
          downloaded &&
          <video controls>
            <source src={props.data?.videoURL} type='video/mp4'/>
            Your browser does not support HTML video.
          </video>
        }

        {
          error &&
          <div className='rce-mbox-video--video__block'>
            <span
              className='rce-mbox-video--video__block-item rce-mbox-video--error'>
              <FaExclamationTriangle/>
            </span>
          </div>
        }
        {
          !error &&
          props.data?.status &&
          !downloaded &&
          <div className='rce-mbox-video--video__block'>
            {
              !props.data.status.click &&
              <button
                onClick={() => props.onDownload}
                className='rce-mbox-video--video__block-item rce-mbox-video--download'>
                <FaCloudDownloadAlt />
              </button>
            }
            {
              typeof props.data.status.loading === 'number' &&
              props.data.status.loading !== 0 &&
              <ProgressCircle
                animate={props.data.status.loading}
                className='rce-mbox-video--video__block-item'
                progressOptions={progressOptions} />
            }
          </div>
        }
      </div>
      {
        props.data?.text &&
        <div className='rce-mbox-text'>
          {props.data.text}
        </div>
      }
    </div>
  );
}

export default VideoMessage;
