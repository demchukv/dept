import React from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" className="col-span-3" />
        </div>
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
