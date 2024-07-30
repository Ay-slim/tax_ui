import { MoreInfoTableColumns, MoreInfoTableDataSource, SetState } from "@/data/types";
import { Modal, Table } from "antd";

const MoreInfoModal = ({
  isModalOpen,
  setIsModalOpen,
  info,
}: {
  isModalOpen: boolean;
  setIsModalOpen: SetState<boolean>;
  info: {
    title: string;
    dataSource: MoreInfoTableDataSource[];
    columns: MoreInfoTableColumns[];
  } | null;
}) => {
  return(
    <>
      <Modal title={info?.title} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} >
        <Table dataSource={info?.dataSource} columns={info?.columns}/>
      </Modal>
    </>
  )
}

export default MoreInfoModal;
