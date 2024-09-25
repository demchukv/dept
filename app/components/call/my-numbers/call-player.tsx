'use client';
import { Button } from '@/components/ui/button';
import { callType } from '@/types/call';
import { Icon } from '@/components/utils/icon';
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import AudioPlayer from '@/app/components/common/audio/player';
import { KeyValText } from '../../common/key-val-text';

export const CallPlayer = ({ msg }: { msg: callType }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="text-main-color w-6 h-6"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open player</span>
        <Icon iconName="Sound" width={24} height={24} />
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader className="mb-6">
            <ModalTitle></ModalTitle>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
          <ModalInner>
            <p className="font-semibold text-base text-center mb-6">
              Запис розмови: <span className="text-main-color">{msg.line}</span>
            </p>
            {msg.recording && (
              <>
                <div className="mb-3 flex flex-col gap-3">
                  <KeyValText
                    k="Дата дзвінка: "
                    val={msg.date}
                    className="justify-between"
                  />
                  <KeyValText
                    k="Номер телефону:"
                    val={msg.number}
                    className="justify-between"
                  />
                  <KeyValText
                    k="Напрямок:"
                    val={
                      <span className="flex items-center gap-1">
                        {msg.direction === 'incoming' && (
                          <Icon
                            iconName="Incoming"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        )}
                        {msg.direction === 'incoming' ? 'Вхідний' : 'Вихідний'}
                        {msg.direction === 'outgoing' && (
                          <Icon
                            iconName="Outgoing"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        )}
                      </span>
                    }
                    className="justify-between"
                  />
                </div>
                <AudioPlayer audioSrc={msg.recording} />
              </>
            )}
          </ModalInner>
          <ModalFooter>
            <div className="w-full flex flex-col sm:flex-row-reverse gap-3">
              {/* <Button type="button" variant="default">
                Застосувати
              </Button> */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Закрити
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
