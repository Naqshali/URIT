"use client";

import { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import proposalsStore from "@/store/myprofile/proposals";

const ProposalAccepted = () => {
  const { proposalId, projectId } = useParams();
  const searchParams = useSearchParams();
  console.log("ProposalAccepted ~ searchParams:", searchParams);
  console.log("ProposalAccepted ~ proposalId:", proposalId);
  console.log("ProposalAccepted ~ projectId:", projectId);
  const { acceptProposal } = proposalsStore();

  useEffect(() => {
    console.log("proposalId", proposalId);
    acceptProposal({ proposalId: proposalId }, projectId);
    // sendMessage({
    //   msg: "Proposal Accepted",
    //   senderId: loggedInUser.userId,
    //   proposalId: proposal.id,
    //   chatType: "Project Chat",
    // });
  }, [proposalId]);

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card
          className="text-center p-4 shadow-lg"
          style={{ maxWidth: "500px" }}
        >
          <h2 className="text-success">Payment Successful!</h2>
          <p>Your proposal has been accepted successfully.</p>

          {/* <Card className="p-3 bg-light">
            <h5>Payment Details</h5>
            <p>
              <strong>Amount Paid:</strong> SAR 100
            </p>
            <p>
              <strong>Transaction ID:</strong> #123456789
            </p>
            <p>
              <strong>Payment Method:</strong> Credit Card
            </p>
          </Card> */}

          {/* <Button
            variant="primary"
            className="mt-3"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button> */}
        </Card>
      </Container>
    </>
  );
};

export default ProposalAccepted;
