
import React from "react";
import {
    Pagination,
    PagincationButtonContainer,
    PaginationButton,
    PaginationIndex,
    RightIconSpan,
    LeftIconSpan,
    NextButtonIcon,
    BackButtonIcon
  } from "./index.style";

export default class TableFooter extends React.Component {
    render() {
        return Boolean(this.props.isPaginated) && (
            <Pagination>
              <PaginationIndex>
                page {this.props.pageIndex + 1} of {this.props.pageOptions.length}
              </PaginationIndex>{" "}
              <PagincationButtonContainer>
                {this.props.canPreviousPage ? (
                  <PaginationButton onClick={() => this.props.previousPage()}>
                    <LeftIconSpan>
                      <BackButtonIcon />
                    </LeftIconSpan>
                    Back
                  </PaginationButton>
                ) : null}
                {this.props.canNextPage ? (
                  <PaginationButton onClick={() => this.props.nextPage()}>
                    Next{" "}
                    <RightIconSpan>
                      <NextButtonIcon />
                    </RightIconSpan>
                  </PaginationButton>
                ) : null}
              </PagincationButtonContainer>
            </Pagination>
          )}
}


       