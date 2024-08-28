import React from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { Button } from '@/components/ui/button';

interface ListOfDocsProps {
  docId: number | null;
}
export const ListOfDocs = ({ docId }: ListOfDocsProps) => {
  if (docId === null) {
    return null;
  }
  //TODO: query for API to get list of docs and render them
  return (
    <>
      <ModalHeader>
        <ModalTitle>Edit profile</ModalTitle>
        <ModalDescription>
          Make changes to your profile here. Click save when done.
        </ModalDescription>
      </ModalHeader>
      <div>
        <p className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores
          voluptate impedit eaque neque sed est provident corrupti accusantium
          mollitia alias quasi praesentium laborum, eligendi nam, minima dolore
          error consequuntur?
        </p>
        <p className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores
          voluptate impedit eaque neque sed est provident corrupti accusantium
          mollitia alias quasi praesentium laborum, eligendi nam, minima dolore
          error consequuntur?
        </p>
        <p className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores
          voluptate impedit eaque neque sed est provident corrupti accusantium
          mollitia alias quasi praesentium laborum, eligendi nam, minima dolore
          error consequuntur?
        </p>
        <p className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores
          voluptate impedit eaque neque sed est provident corrupti accusantium
          mollitia alias quasi praesentium laborum, eligendi nam, minima dolore
          error consequuntur?
        </p>
      </div>
      <ModalFooter>
        <Button variant={'outline'} type="submit">
          Save changes
        </Button>
      </ModalFooter>
    </>
  );
};
